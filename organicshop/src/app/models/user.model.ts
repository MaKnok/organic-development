export interface User {
  _id?: number | string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userFullName: string;
  userBirthday: Date;
  userSegment: string;
  userRole: string;
}
