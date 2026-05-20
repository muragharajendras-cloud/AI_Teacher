"""add consent tracking

Revision ID: 002_add_consent_tracking
Revises: 001_initial_schema
Create Date: 2026-05-11 12:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '002_add_consent_tracking'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('student_profiles', sa.Column('consent_recorded_at', sa.DateTime(timezone=True), nullable=True))


def downgrade() -> None:
    op.drop_column('student_profiles', 'consent_recorded_at')
