ALTER TABLE task_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can upload files for their tasks" 
ON task_files 
FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "Users can view files related to their tasks" 
ON task_files 
FOR SELECT USING (
    task_id IN (SELECT id FROM tasks WHERE auth.uid() = created_by OR auth.uid() = assigned_to)
);
