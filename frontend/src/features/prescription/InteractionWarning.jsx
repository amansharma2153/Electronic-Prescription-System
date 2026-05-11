export default function InteractionWarning({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-red-600">
            ⚠ Drug Interaction Alert
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Severity */}
        {data.severity && (
          <p className={`mb-2 font-medium
            ${data.severity === 'HIGH' ? 'text-red-600' :
              data.severity === 'MEDIUM' ? 'text-yellow-600' :
              'text-green-600'
            }`}>
            Severity: {data.severity}
          </p>
        )}

        {/* Message */}
        <p className="mb-3 text-gray-700">
          {data.message}
        </p>

        {/* Recommendation */}
        {data.recommendation && (
          <p className="text-sm text-gray-600">
            👉 {data.recommendation}
          </p>
        )}

        {/* Action */}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Close
        </button>

      </div>

    </div>
  );
}