import type { RecordModel } from 'pocketbase';

export default function (pb: any) {
  pb.beforeCreateRequest('users', (req: any, record: RecordModel) => {
    record.emailVisibility = true;
  });
}
