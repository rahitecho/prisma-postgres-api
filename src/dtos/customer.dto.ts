import { IsString, IsEmail, IsOptional, IsInt, IsDate, IsBoolean, IsNumber, Length, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsString()
  @MaxLength(55)
  name: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dob?: Date;

  @IsOptional()
  @IsString()
  @MaxLength(11)
  gender?: string;

  @IsString()
  @MaxLength(55)
  phone: string;

  @IsEmail()
  @MaxLength(55)
  email: string;

  @IsInt()
  sport_id: number;

  @IsInt()
  city_id: number;

  @IsString()
  @MaxLength(55)
  customer_code: string;

  @IsString()
  location: string;

  @IsString()
  address: string;

  @IsString()
  @MaxLength(11)
  employment_status: string;

  @IsString()
  @MaxLength(11)
  resident_status: string;

  @IsInt()
  status: number;

  @IsOptional()
  @IsInt()
  created_by?: number;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  otp?: string;

  @IsOptional()
  @IsBoolean()
  isverified?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  otp_expiry_time?: string;

  @IsOptional()
  @IsInt()
  valid_otp_time?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  google_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  facebook_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  apple_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  order_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  payment_id?: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  order_status?: string;

  @IsOptional()
  @IsString()
  @MaxLength(4096)
  picture?: string;

  @IsOptional()
  @IsInt()
  venue_id?: number;
}
