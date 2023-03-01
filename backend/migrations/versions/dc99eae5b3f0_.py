"""empty message

Revision ID: dc99eae5b3f0
Revises: ad34f3b7b47f
Create Date: 2023-03-01 22:04:46.817104

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dc99eae5b3f0'
down_revision = 'ad34f3b7b47f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('judgment_day', schema=None) as batch_op:
        batch_op.drop_column('test')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('judgment_day', schema=None) as batch_op:
        batch_op.add_column(sa.Column('test', sa.VARCHAR(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
