
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  commodity TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT ALL ON public.inquiries TO service_role;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiry"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(company_email) BETWEEN 3 AND 200
    AND company_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(commodity) BETWEEN 1 AND 100
    AND length(message) BETWEEN 1 AND 5000
  );
