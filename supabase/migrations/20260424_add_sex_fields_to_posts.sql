alter table posts
  add column if not exists relationship_count integer,
  add column if not exists ideal_sex_frequency integer,
  add column if not exists sex_duration integer,
  add column if not exists ideal_sex_duration integer,
  add column if not exists sex_satisfaction integer,
  add column if not exists sex_satisfaction_note text,
  add column if not exists masturbation_frequency integer;
