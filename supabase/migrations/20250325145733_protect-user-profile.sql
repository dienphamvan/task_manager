ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" 
ON profiles 
FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile"
ON profiles 
FOR UPDATE USING (auth.uid() = id);
