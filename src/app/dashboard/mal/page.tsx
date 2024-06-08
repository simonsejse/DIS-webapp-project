import React from 'react';
import { Ban } from 'lucide-react';

type Props = {};

const WorkInProgressPage: React.FC<Props> = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <Ban className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-yellow-600 mb-4">
          Work In Progress
        </h1>
        <p className="text-gray-700 text-lg mb-4">
          Mål er nuværende under arbejde.
        </p>
        <p className="text-gray-500">
          Vend venligst tilbage senere eller kontakt support, hvis du har brug
          for mere Information.
        </p>
      </div>
    </div>
  );
};

export default WorkInProgressPage;
