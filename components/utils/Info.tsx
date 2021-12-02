export default function Success() {
    return (
   
          <div className="alert flex flex-row items-center bg-blue-200 p-5 rounded border-b-2 border-blue-300">
              <div className="alert-icon flex items-center bg-blue-100 border-2 border-blue-500 justify-center h-10 w-10 flex-shrink-0 rounded-full">
                  <span className="text-blue-500">
                      <svg fill="currentColor"
                           viewBox="0 0 20 20"
                           className="h-6 w-6">
                          <path fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                               clipRule="evenodd"></path>
                      </svg>
                  </span>
              </div>
              <div className="alert-content ml-4">
                  <div className="alert-title font-semibold text-lg text-blue-800">
                      Info
                  </div>
                  <div className="alert-description text-sm text-blue-600">
                      This is an alert message, alert message goes here..!
                  </div>
              </div>
          </div>
  
     
    );
  }
  