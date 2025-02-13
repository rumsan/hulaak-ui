'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLocalStorage from '@/hooks/localstorag';
import { Inbox, SearchIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Amita } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
const amita = Amita({ weight: '700', subsets: ['latin'] });

function HomePage() {
  const router = useRouter();
  const [cacheBox, setCachebox] = useLocalStorage<string[]>('mailboxes', []);
  const [inputBox, setInputBox] = useState('');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    openMailbox(inputBox);
  };

  const openMailbox = (box: string) => {
    if (box) {
      // Extract the text before the '@'
      const inbox = box.trim().toLowerCase().split('@')[0];

      setCachebox((d) => {
        const newCache = [inbox, ...d.filter((item) => item !== inbox)];
        return newCache.slice(0, 5);
      });

      router.push(`/box/${encodeURIComponent(inbox)}`);
    }
  };

  return (
    <>
      <div className="relative overflow-hidden">
        <div className=" py-24 lg:py-32">
          <div className="text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
              <span className={amita.className}>maile</span>
            </h1>
            <p className="mt-3 text-xl text-muted-foreground">
              Disposable email addresses for developers.
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="relative z-10 flex space-x-3 p-3 border bg-background rounded-lg shadow-lg">
                  <div className="flex-[1_0_0%]">
                    <Label htmlFor="article" className="sr-only">
                      Enter Mailbox...
                    </Label>
                    <Input
                      name="article"
                      className="h-full"
                      id="article"
                      placeholder="Enter Mailbox...  (without @maile.uk)"
                      value={inputBox}
                      onChange={(e) => setInputBox(e.target.value)}
                    />
                  </div>
                  <div className="flex-[0_0_auto]">
                    <Button size={'icon'}>
                      <SearchIcon />
                    </Button>
                  </div>
                </div>
              </form>
              {/* End Form */}
              {/* SVG Element */}
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-10">
                <svg
                  className="w-16 h-auto text-orange-500"
                  width={121}
                  height={135}
                  viewBox="0 0 121 135"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                  <path
                    d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                    stroke="currentColor"
                    strokeWidth={10}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
              {/* SVG Element */}
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <svg
                  className="w-40 h-auto text-cyan-500"
                  width={347}
                  height={188}
                  viewBox="0 0 347 188"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                    stroke="currentColor"
                    strokeWidth={7}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              {/* End SVG Element */}
            </div>
            <div className="fixed bottom-40 left-0 right-0 gap-4 flex flex-wrap justify-center text-gray-500">
              {cacheBox.map((box) => (
                <Button
                  variant={'outline'}
                  key={box}
                  onClick={() => openMailbox(box)}
                >
                  <Inbox className="flex-shrink-0 w-3 h-auto mr-2" />
                  {`${box}@maile.uk`}
                </Button>
              ))}
            </div>

            <div className="fixed bottom-10 left-0 right-0 text-center text-xs text-gray-500 mx-auto">
              Maile.uk is temporary and disposable email mailbox. It is open and
              can be accessed by anyone. Please DO NOT send any secrets or
              sensitive data. <br />
              By checking mailbox, you agree our&nbsp;
              <Link href="/terms" className="underline">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});
