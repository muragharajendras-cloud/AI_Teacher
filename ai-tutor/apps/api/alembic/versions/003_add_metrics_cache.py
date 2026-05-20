"""add metrics cache

Revision ID: 003_add_metrics_cache
Revises: 002_add_consent_tracking
Create Date: 2026-05-11 12:30:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '003_add_metrics_cache'
down_revision: Union[str, None] = '002_add_consent_tracking'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('student_profiles', sa.Column('cached_metrics', postgresql.JSONB(astext_type=sa.Text()), nullable=True))


def downgrade() -> None:
    op.drop_column('student_profiles', 'cached_metrics')
