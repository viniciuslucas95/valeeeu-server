import { Request } from 'express';

export class RequestParamsHandler {
  static getAccountId(req: Request) {
    return { accountId: req.params.accountId };
  }

  static getProfileId(req: Request) {
    return { profileId: req.params.profileId };
  }

  static getContactId(req: Request) {
    return { contactId: req.params.contactId };
  }
}
