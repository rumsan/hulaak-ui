'use client';
import { File, InboxIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MailDisplay } from '@/app/inbox/components/mail-display';
import { MailList } from '@/app/inbox/components/mail-list';
import { Nav } from '@/app/inbox/components/nav';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useRsAlert } from '@/hooks/rs.alert';
import { cn } from '@/lib/utils';
import { createAudioContext, playSound } from '@/utils/beep';
import { Mail } from '@rumsan/hulaak/types';
import { io } from 'socket.io-client';
import { EmailQuery } from '../../../../query/email.query';
import { useInboxListByAddress } from '../../../../query/inbox.query';

interface MailProps {
  inboxInfo: {
    host: string;
    mailbox: string;
  };
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Inbox({
  inboxInfo,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [selected, setSelected] = useState<Mail | null>(null);
  const [alertSound, setAlertSound] = useState(false);
  const alertSoundRef = useRef(alertSound);
  const { RsAlert, showAlert } = useRsAlert();

  const inbox = useInboxListByAddress(inboxInfo.mailbox, inboxInfo.host);
  const setRead = EmailQuery.useSetMailToRead();
  const mails = useMemo(() => inbox.data || [], [inbox.data]);

  // Keep the ref in sync with alertSound state
  useEffect(() => {
    alertSoundRef.current = alertSound;
  }, [alertSound]);

  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      createAudioContext().then((audioContext) => {
        if (audioContext) {
          audioContextRef.current = audioContext;
        }
      });
    }
  }, []);

  const initializeSocket = useCallback(() => {
    const socketIo = io(process.env.NEXT_PUBLIC_HULAAK_URL as string);

    socketIo.on('new-email', (message: Mail) => {
      if (
        message.mailbox === inboxInfo.mailbox &&
        message.domain === inboxInfo.host
      ) {
        setTimeout(() => {
          if (alertSoundRef.current && audioContextRef.current) {
            playSound(audioContextRef.current!);
          }
          inbox.refetch();
        }, 1000);
      }
    });

    socketIo.on('connect', () => {
      console.info(
        `Listening for message on mailbox: ${inboxInfo.mailbox}@${inboxInfo.host}`
      );
    });

    return () => socketIo.disconnect();
  }, [inboxInfo]);

  useEffect(() => {
    return initializeSocket();
  }, [initializeSocket]);

  const selectMail = useCallback(
    async (mail: Mail) => {
      const selectedMail = mails.find((item) => item.id === mail.id);
      if (selectedMail) {
        selectedMail.read = true;
        setSelected(mail);
        await setRead.mutateAsync(selectedMail.id);
      }
    },
    [mails, setRead]
  );

  const showComingSoon = useCallback(() => {
    showAlert({
      title: 'Coming soon',
      description:
        'Hang tight! We are working on this feature. Stay tuned for updates.',
      onConfirm: () => console.log('Coming soon confirmed'),
    });
  }, [showAlert]);

  const toggleAlertSound = useCallback(() => {
    setAlertSound((prev) => !prev);
  }, []);

  return (
    <TooltipProvider delayDuration={0}>
      <RsAlert />
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          // onCollapse={(collapsed) => {
          //   console.log(collapsed);
          //   setIsCollapsed(collapsed);
          //   document.cookie = `react-resizable-panels:collapsed=${collapsed}`;
          // }}
          // className={cn(
          //   isCollapsed &&
          //     'min-w-[50px] transition-all duration-300 ease-in-out'
          // )}
          className="max-sm:hidden"
        >
          <div
            className={cn(
              'flex h-[52px] items-center justify-center',
              isCollapsed ? 'h-[52px]' : 'px-2'
            )}
          >
            <h3 className="text-l font-bold text-blue-600">{`${inboxInfo.mailbox}@${inboxInfo.host}`}</h3>
            {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
          </div>
          <Separator />
          <div className="flex flex-col h-[calc(100vh-170px)]">
            <div>
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: 'Inbox',
                    label: mails.length.toString(),
                    icon: InboxIcon,
                    variant: 'default',
                  },
                  {
                    title: 'Webhooks',
                    icon: File,
                    variant: 'ghost',
                    onClick: showComingSoon,
                  },
                ]}
              />
            </div>
            {/* <div className="mt-auto">
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: 'Settings',
                    icon: Settings,
                    variant: 'ghost',
                    onClick: showComingSoon,
                  },
                ]}
              />
            </div> */}
          </div>
        </ResizablePanel>
        <ResizableHandle className="max-sm:hidden" />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              {/* <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form> */}
            </div>
            <TabsContent value="all" className="m-0">
              <MailList
                items={mails || []}
                selected={selected}
                selectMail={selectMail}
              />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList
                items={mails.filter((item) => !item.read) || []}
                selected={selected}
                selectMail={selectMail}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle className="max-sm:hidden" />
        <ResizablePanel
          defaultSize={defaultLayout[2]}
          className="max-sm:hidden"
        >
          <MailDisplay
            selected={selected || undefined}
            inboxInfo={inboxInfo}
            // alertSound={{
            //   enabled: alertSound,
            //   changeState: playAlertSound,
            // }}
            alertSoundState={alertSound}
            changeAlertSoundState={toggleAlertSound}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
