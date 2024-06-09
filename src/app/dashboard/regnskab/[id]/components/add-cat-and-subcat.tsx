import { IconButton, Tooltip } from '@mui/material';
import { Plus } from 'lucide-react';

type AddCatAndSubcatProps = {
  title: string;
  onClick: () => void;
  size: 'small' | 'medium' | 'large';
};

export default function AddCatAndSubcat({
  title,
  onClick,
  size,
}: AddCatAndSubcatProps) {
  return (
    <div className="mx-5 mt-2">
      <Tooltip title={title}>
        <IconButton onClick={onClick} size={size}>
          <Plus />
        </IconButton>
      </Tooltip>
    </div>
  );
}
