'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Search } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Inbox } from '../../inbox/components/inbox';

function MailHome() {
  const router = useRouter();
  const { box } = useParams();
  const inboxInfo = {
    host: 'maile.uk',
    mailbox: box,
  };

  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href;
    const urlObject = new URL(currentUrl);

    if (urlObject.hostname !== 'localhost') {
      inboxInfo.host = urlObject.hostname;
    }
  }

  const [searchInput, setSearchInput] = useState('');
  const [mailbox, setMailbox] = useState(inboxInfo);

  const layout = null; // cookies().get('react-resizable-panels:layout');
  const collapsed = null; // cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : [265, 440, 655];
  const defaultCollapsed = collapsed ? collapsed.value : false;

  useEffect(() => {
    if (mailbox.mailbox && mailbox.host) {
      router.replace(`/box/${mailbox.mailbox}`);
    }
  }, [mailbox]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      setMailbox((d) => ({ ...d, mailbox: searchInput.trim().toLowerCase() }));
      setSearchInput('');
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="relative mr-auto flex-1 md:grow-0">
              <span className="w-full pl-24">
                <Image
                  src="/maile_logo.png"
                  alt="Logo"
                  width={600}
                  height={200}
                  sizes="(max-width: 768px) 100vw, 50vw" // Serve different sizes based on screen width
                  className="w-full max-w-[300px] md:max-w-[600px] h-auto overflow-hidden pb-5 object-contain"
                />
              </span>
            </div>
            <div className="relative flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Get Mailbox..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="https://www.logoai.com/oss/icons/2022/09/21/icon_632a8427d40a4.svg"
                    width={28}
                    height={28}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.replace('/')}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="mt-2 sm:px-6 sm:py-0 md:gap-8">
            <div className="border rounded-lg h-[calc(100vh-100px)]">
              <Inbox
                inboxInfo={mailbox}
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
                navCollapsedSize={4}
              />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default dynamic(() => Promise.resolve(MailHome), {
  ssr: false,
});
