'use client';

import { format } from 'date-fns/format';
import DOMPurify from 'dompurify';
import { ArrowLeft, MoreVertical, Trash } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useRsAlert } from '@/hooks/rs.alert';
import { Mail } from '@rumsan/hulaak/types';
import { useEffect, useRef } from 'react';
import { EmailQuery } from '../../../../query/email.query';

interface MailDisplayProps {
  inboxInfo: {
    host: string;
    mailbox: string;
  };
  selected?: Mail;
  alertSoundState: boolean;
  isSmallScreen: boolean;
  closeDisplay: () => void;
  changeAlertSoundState: () => void;
}

const getRandomLightColor = (str: string = 'RS') => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to RGB values
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  // Ensure the color is light by adjusting RGB values
  const lightR = Math.min(255, r + 180); // Add a constant to make it lighter
  const lightG = Math.min(255, g + 180);
  const lightB = Math.min(255, b + 180);

  return `rgb(${lightR}, ${lightG}, ${lightB})`;
};

/*
const getRandomLightColor = (str: string = 'RS') => {
  const letters = '89ABCDEF'; // Use only higher values to ensure lighter colors
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};
*/

export function MailDisplay({
  inboxInfo,
  selected,
  alertSoundState,
  closeDisplay,
  isSmallScreen,
  changeAlertSoundState,
}: MailDisplayProps) {
  const { RsAlert, showAlert } = useRsAlert();
  const { data: mail } = EmailQuery.useGetById(selected?.id || '');
  const initials = mail?.from?.substring(0, 2).toUpperCase() || 'RS';
  const avatraColor = getRandomLightColor(initials);

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let message = mail?.message?.html;
    if (message < 5) {
      message = mail?.message?.text || 'ERROR: NO BODY SENT';
    }

    if (!iframeRef.current) return;
    const iframeDoc =
      iframeRef.current.contentDocument ||
      iframeRef.current.contentWindow?.document;

    if (iframeDoc) {
      iframeDoc.open();
      iframeDoc.write(DOMPurify.sanitize(message));
      iframeDoc.close();
      iframeRef.current.contentWindow?.scrollTo(0, 0);
    }
  }, [mail]);

  const showComingSoon = () => {
    showAlert({
      title: 'Coming soon',
      description:
        'Hang tight! We are working on this feature. Stay tuned for updates.',
      onConfirm: () => {
        console.log('Account deleted');
      },
    });
  };

  return (
    <div className="flex h-full flex-col">
      <RsAlert />

      {mail && isSmallScreen ? (
        <>
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={closeDisplay}>
                    <ArrowLeft className="h-4 w-4" />
                    <span className="sr-only">Archive</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Archive</TooltipContent>
              </Tooltip>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.date), 'PPpp')}
              </div>
              <Separator orientation="vertical" className=" h-4" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={showComingSoon}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Archive</TooltipContent>
              </Tooltip>
            </div>
          </div>
          <Separator />
        </>
      ) : null}

      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.address} />
                <AvatarFallback
                  style={{ backgroundColor: avatraColor, fontWeight: 600 }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail?.from}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
              </div>
            </div>
            {!isSmallScreen ? (
              <>
                <div className="ml-auto text-xs text-muted-foreground">
                  {format(new Date(mail.date), 'PPpp')}
                </div>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-3"
                      disabled={!mail}
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={showComingSoon}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : null}
          </div>
          <Separator />

          <ScrollArea className="h-[calc(100dvh-210px)] p-2">
            {/* <div
              className="flex-1 whitespace-pre-wrap p-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(mail.message?.html || ''),
              }}
            ></div> */}
            <iframe
              ref={iframeRef}
              className="w-full h-[calc(100dvh-220px)] border-none"
              title="email-content"
            />
          </ScrollArea>

          {/* <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mute this
                    thread
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-120px)] p-40 text-center text-muted-foreground">
          Send mail to this address
          <br />
          <b>{`${inboxInfo.mailbox}@${inboxInfo.host}`}</b>
        </div>
      )}
      <Separator />
      <div className="h-8 flex justify-between items-center">
        <div className="flex items-center space-x-2 ml-2">
          <Switch
            id="chime"
            checked={alertSoundState}
            onCheckedChange={changeAlertSoundState}
          />
          <Label htmlFor="chime" className="text-xs text-muted-foreground">
            Play Chime
          </Label>
        </div>
        <div
          className="p-2 text-muted-foreground text-right"
          style={{ fontSize: '0.7rem' }}
        >
          © 2024 Maile.uk. All rights reserved.
        </div>
      </div>
    </div>
  );
}
