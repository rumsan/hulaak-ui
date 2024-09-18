import { getInboxClient } from '@rumsan/hulaak/clients';
import { Mail } from '@rumsan/hulaak/types';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { useRSQuery } from './rs-query-provider';

const inbox = getInboxClient({
  baseURL: `${process.env['NEXT_PUBLIC_HULAAK_URL']}/v1`,
});

export const useInboxListByAddress = (
  mailbox: string,
  host: string
): UseQueryResult<Mail[], Error> => {
  const { queryClient } = useRSQuery();
  return useQuery(
    {
      queryKey: ['inbox', `${mailbox}@${host}`],
      queryFn: async () => {
        const { data } = await inbox.listByAddress(mailbox, host);
        return data;
      },
      enabled: !!mailbox && !!host,
    },
    queryClient
  );
};
