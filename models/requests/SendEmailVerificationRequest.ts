import {EmailType} from "@components/constants/enums";


export interface SendEmailVerificationRequest {
  email: string;
  emailType: EmailType;
  userId: string;
}
