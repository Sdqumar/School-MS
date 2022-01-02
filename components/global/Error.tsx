type errorProps = {
    message?: string | undefined;
  };

export default function Errror({ message }: errorProps) {
    return <p className="text-red-600 mt-2">{message.toLowerCase()}</p>;
  }
  