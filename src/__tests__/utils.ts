import { Aboyeur } from '@ifood/aboyeur';
import { TrackJsPlugin } from '@ifood/aboyeur-plugin-trackjs';
import { waitFor } from '@testing-library/react';

type AboyeurEventAssertionOptions = {
  entity: string;
  feature: string;
  label: string;
};

export async function assertAboyeurEvent({ entity, feature, label }: AboyeurEventAssertionOptions) {
  const anyPlugin = TrackJsPlugin.displayName;

  const expectedEvent = expect.objectContaining({ entity, feature, label });
  await waitFor(() => expect(Aboyeur.mocks.sendEvent).toHaveBeenCalledWith(anyPlugin, expectedEvent));
}
