import React from 'react';
import { AlertTriangle } from 'lucide-react';

type Props = {
    error: string;
}

const ErrorComponent = (props: Props) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-3xl font-semibold text-red-600 mb-4">Fejl</h1>
        <p className="text-gray-700 text-lg mb-4">{props.error}</p>
        <p className="text-gray-500">Noget gik galt ved indlæsing af ønskede side, prøv igen senere eller kontakt support.</p>
      </div>
    </div>
  );
};

export default ErrorComponent;