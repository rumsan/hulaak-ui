'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Function to fetch random words from an API
async function fetchRandomWords() {
  try {
    const response = await fetch('/api/v1/apps/random-words');
    if (!response.ok) throw new Error('API error');
    return response.json();
  } catch (error) {
    console.error('Failed to fetch words from API:', error);
    return fetch('/random-words.json').then((res) => res.json());
  }
}

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [randomPlaceholder, setRandomPlaceholder] = useState('');
  const router = useRouter();

  // Fetch random words when the component mounts
  useEffect(() => {
    const getWords = async () => {
      const words = await fetchRandomWords();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setRandomPlaceholder(randomWord);
    };
    getWords();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      const inbox = email.toLowerCase();
      router.push(`/inbox?mailbox=${encodeURIComponent(inbox)}`);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="flex items-center">
        <Image
          src="/maile_logo.png"
          width={150}
          height={50}
          alt="Logo"
          className="overflow-hidden pb-5"
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Mailbox</Label>
              <div className="flex items-center">
                <Input
                  id="email"
                  type="text"
                  placeholder={`${randomPlaceholder}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow"
                />
                <span className="ml-2">@maile.uk</span>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Open Mailbox
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-xs">
          Maile.uk is temporary and disposable email mailbox. It is open and can
          be accessed by anyone. Please DO NOT send any secrets and sensitive
          data. <br />
          <br />
          By checking mailbox you agree our <br />
          <Link href="/terms" className="underline">
            Terms and Conditions
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
