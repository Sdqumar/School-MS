type errorProps = {
    message?: string | undefined;
  };

export default function Errror({ message }: errorProps) {
    return <p>{message}</p>;
  }
  