"""initial schema

Revision ID: 001
Revises: 
Create Date: 2024-05-11 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Create Supabase Auth Stub (so RLS works locally)
    op.execute('''
    CREATE SCHEMA IF NOT EXISTS auth;
    CREATE OR REPLACE FUNCTION auth.uid() RETURNS uuid AS $$
      BEGIN
        RETURN current_setting('request.jwt.claim.sub', true)::uuid;
      EXCEPTION WHEN OTHERS THEN
        RETURN NULL;
      END;
    $$ LANGUAGE plpgsql STABLE;
    ''')

    # 2. Create tables
    op.create_table('users',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('email', sa.String(), nullable=False),
        sa.Column('role', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.CheckConstraint("role IN ('student', 'parent', 'admin')"),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email')
    )

    op.create_table('student_profiles',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('parent_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('grade', sa.Integer(), nullable=True),
        sa.Column('board', sa.String(), nullable=True),
        sa.Column('subjects', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('elo_ratings', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('onboarded', sa.Boolean(), nullable=True),
        sa.ForeignKeyConstraint(['parent_id'], ['users.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('textbooks',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('subject', sa.String(), nullable=True),
        sa.Column('grade', sa.Integer(), nullable=True),
        sa.Column('board', sa.String(), nullable=True),
        sa.Column('s3_key', sa.String(), nullable=True),
        sa.Column('status', sa.String(), nullable=True),
        sa.Column('chunk_count', sa.Integer(), nullable=True),
        sa.Column('uploaded_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.CheckConstraint("status IN ('uploading','indexing','ready','failed')"),
        sa.ForeignKeyConstraint(['student_id'], ['student_profiles.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('sessions',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('subject', sa.String(), nullable=True),
        sa.Column('chapter', sa.String(), nullable=True),
        sa.Column('started_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('ended_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('duration_min', sa.Integer(), nullable=True),
        sa.Column('transcript', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('elo_delta', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.ForeignKeyConstraint(['student_id'], ['student_profiles.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('behavior_incidents',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('session_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('type', sa.String(), nullable=True),
        sa.Column('photo_url', sa.String(), nullable=True),
        sa.Column('notified_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('ts', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.ForeignKeyConstraint(['session_id'], ['sessions.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    op.create_table('test_results',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('student_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('subject', sa.String(), nullable=True),
        sa.Column('chapter', sa.String(), nullable=True),
        sa.Column('score', sa.Float(), nullable=True),
        sa.Column('max_score', sa.Float(), nullable=True),
        sa.Column('answers', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column('taken_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.PrimaryKeyConstraint('id')
    )

    # 3. Add RLS Policies
    op.execute('ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;')
    op.execute('''
    CREATE POLICY student_own_sessions ON sessions
      USING (student_id = auth.uid());
    ''')


def downgrade() -> None:
    op.execute('DROP POLICY IF EXISTS student_own_sessions ON sessions;')
    op.execute('ALTER TABLE sessions DISABLE ROW LEVEL SECURITY;')
    op.drop_table('test_results')
    op.drop_table('behavior_incidents')
    op.drop_table('sessions')
    op.drop_table('textbooks')
    op.drop_table('student_profiles')
    op.drop_table('users')
    op.execute('DROP FUNCTION IF EXISTS auth.uid()')
    op.execute('DROP SCHEMA IF EXISTS auth')
