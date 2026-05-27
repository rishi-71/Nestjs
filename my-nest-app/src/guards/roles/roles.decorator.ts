import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";

//decorator - this is the custom decorator named Roles 
export const Roles = (...roles : string[]) => SetMetadata(ROLES_KEY,roles);
