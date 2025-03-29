ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own and assigned tasks" 
ON tasks 
FOR SELECT USING (auth.uid() = created_by OR auth.uid() = assigned_to);
CREATE POLICY "Users can create tasks" 
ON tasks 
FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update their own tasks" 
ON tasks 
FOR UPDATE USING (auth.uid() = created_by);
