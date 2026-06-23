
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

DROP POLICY "Anyone can apply" ON public.applications;
CREATE POLICY "Anyone can apply" ON public.applications FOR INSERT TO anon, authenticated
WITH CHECK (length(trim(parent_name)) > 1 AND length(trim(child_name)) > 1 AND length(trim(email)) > 3 AND length(trim(phone)) > 5);
