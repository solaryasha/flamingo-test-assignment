ALTER TABLE "public"."users" 
ADD CONSTRAINT "auth_user_id" 
REFERENCES "auth"."users"("id") 
ON DELETE CASCADE;