-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(55) NOT NULL,
    "dob" DATE,
    "gender" VARCHAR(11) NOT NULL DEFAULT 'Male',
    "phone" VARCHAR(55) NOT NULL,
    "email" VARCHAR(55) NOT NULL,
    "sport_id" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "customer_code" VARCHAR(55) NOT NULL,
    "location" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "employment_status" VARCHAR(11) NOT NULL,
    "resident_status" VARCHAR(11) NOT NULL,
    "status" INTEGER NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "created_on" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_on" TIMESTAMP(6) NOT NULL,
    "otp" VARCHAR(45),
    "isverified" SMALLINT NOT NULL DEFAULT 0,
    "otp_expiry_time" VARCHAR(45),
    "valid_otp_time" INTEGER NOT NULL DEFAULT 15,
    "google_id" VARCHAR(100),
    "facebook_id" VARCHAR(100),
    "apple_id" VARCHAR(100),
    "order_id" VARCHAR(100),
    "payment_id" VARCHAR(100),
    "order_status" VARCHAR(45),
    "picture" VARCHAR(4096),
    "venue_id" INTEGER,

    CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_email_key" ON "customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
