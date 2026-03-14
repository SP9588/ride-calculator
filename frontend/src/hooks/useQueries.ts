import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useStartBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      const otp = await actor.startBooking();
      return Number(otp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tripExists'] });
    }
  });
}

export function useVerifyOTP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enteredOTP: number) => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.verifyOTP(BigInt(enteredOTP));
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tripExists'] });
    }
  });
}

export function useCalculateCost() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({ distance, time }: { distance: number; time: number }) => {
      if (!actor) throw new Error('Actor not initialized');
      const cost = await actor.getCost(distance, time);
      return Number(cost);
    }
  });
}

export function useCheckTripExists() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['tripExists'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.checkTripExists();
    },
    enabled: !!actor && !isFetching
  });
}

