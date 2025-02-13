import { getEmailClient } from '@rumsan/hulaak/clients/email.client';
import { Mail } from '@rumsan/hulaak/types';
import { UseQueryResult, useMutation, useQuery } from '@tanstack/react-query';
import { useRSQuery } from './rs-query-provider';

const inbox = getEmailClient({
  baseURL: `${process.env['NEXT_PUBLIC_HULAAK_URL']}/v1`,
});

const useGetById = (id: string): UseQueryResult<Mail, Error> => {
  const { queryClient } = useRSQuery();

  return useQuery(
    {
      queryKey: ['email', id],
      queryFn: async () => {
        const { data } = await inbox.getById(id);
        return data;
      },
      enabled: !!id,
    },
    queryClient
  );
};

const useSetMailToRead = () => {
  const { queryClient } = useRSQuery();
  return useMutation(
    {
      mutationKey: [''],
      mutationFn: (id: string) => inbox.setMailToRead(id),
    },
    queryClient
  );
};

export const EmailQuery = {
  useGetById,
  useSetMailToRead,
};
