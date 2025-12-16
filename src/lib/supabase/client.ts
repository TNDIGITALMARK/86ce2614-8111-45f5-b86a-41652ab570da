import { createClient } from '@supabase/supabase-js';

// Supabase configuration with tenant/project scoped authentication
export const supabase = createClient(
  'https://hfndfmtxhqvubnfiwzlz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmbmRmbXR4aHF2dWJuZml3emx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2Mjk4MDgsImV4cCI6MjA3NjIwNTgwOH0.n0NK_Ov03-UbDQYr5mio3ggYa5XTN-XI1kB6X81N4nA',
  {
    global: {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsImF1ZCI6ImF1dGhlbnRpY2F0ZWQiLCJyb2xlIjoiYW5vbiIsInRlbmFudF9pZCI6InE1SFdVZm5VN3ZYbkRlSFdLTFdlMGFIdWNadDEiLCJwcm9qZWN0X2lkIjoiODZjZTI2MTQtODExMS00NWY1LWI4NmEtNDE2NTJhYjU3MGRhIiwianRpIjoiN2ZkOTBkZTktODViNC00Y2I5LWJjYWUtNzk2NzBjNzQ5NThmIiwiaWF0IjoxNzY1ODg3OTQ2LCJleHAiOjE3NjU4OTA2NDZ9.C8uWJpVd2TyocUkNGlAjO9anLvq2LWaI-A97VyGo27A`
      }
    }
  }
);

// Tenant and project identifiers
export const TENANT_ID = 'q5HWUfnU7vXnDeHWKLWe0aHucZt1';
export const PROJECT_ID = '86ce2614-8111-45f5-b86a-41652ab570da';
