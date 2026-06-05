import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yitbpeuryjtdwzumgvia.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpdGJwZXVyeWp0ZHd6dW1ndmlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODUyOTk5NCwiZXhwIjoyMDk0MTA1OTk0fQ.K5gyOt76nyYEiFA7ZVrDROINVHfCQUyBVF4C3Y9oY_s'
);

async function test() {
  const { data, error } = await supabase.from('intake_responses').select('*').limit(1);
  console.log('Select error:', error);
  console.log('Select keys:', Object.keys(data?.[0] || {}));
  console.log('Select data:', data);
}
test();
