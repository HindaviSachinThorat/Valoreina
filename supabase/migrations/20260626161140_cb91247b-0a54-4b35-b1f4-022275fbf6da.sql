
ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS company TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS quantity TEXT;

DROP POLICY IF EXISTS "Anyone can submit inquiry" ON public.inquiries;

CREATE POLICY "Anyone can submit inquiry"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(company_email) BETWEEN 3 AND 200
    AND company_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(commodity) BETWEEN 1 AND 200
    AND length(message) BETWEEN 1 AND 5000
    AND (company IS NULL OR length(company) <= 200)
    AND (country IS NULL OR length(country) <= 100)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (quantity IS NULL OR length(quantity) <= 100)
  );
