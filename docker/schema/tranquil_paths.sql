-- Adminer 5.2.1 PostgreSQL 17.5 dump

DROP TABLE IF EXISTS "booking";
CREATE TABLE "public"."booking" (
    "client_id" uuid NOT NULL,
    "event_id" uuid NOT NULL,
    "slots" integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "client";
CREATE TABLE "public"."client" (
    "id" uuid NOT NULL,
    "phone_number" text NOT NULL,
    "email" text NOT NULL,
    "full_name" text NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "event";
CREATE TABLE "public"."event" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "date_time" timestamp NOT NULL,
    "cost" integer NOT NULL,
    "free_slots_count" integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "product";
CREATE TABLE "public"."product" (
    "id" uuid NOT NULL,
    "name" text NOT NULL,
    "cost" integer NOT NULL,
    "image" bytea NOT NULL,
    "description" text NOT NULL,
    "amount_available" integer NOT NULL
) WITH (oids = false);


DROP TABLE IF EXISTS "review";
CREATE TABLE "public"."review" (
    "full_name" text NOT NULL,
    "age" integer NOT NULL,
    "photo" bytea NOT NULL,
    "text" text NOT NULL
) WITH (oids = false);


-- 2025-05-09 19:17:46 UTC
