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

  static getRatingId(req: Request) {
    return { ratingId: req.params.ratingId };
  }

  static getPictureId(req: Request) {
    return { pictureId: req.params.pictureId };
  }

  static getTagId(req: Request) {
    return { tagId: req.params.tagId };
  }

  static getItemId(req: Request) {
    return { itemId: req.params.itemId };
  }

  static getServiceId(req: Request) {
    return { serviceId: req.params.serviceId };
  }
}
