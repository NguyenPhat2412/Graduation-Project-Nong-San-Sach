import { Result } from "antd";
import { Button } from "react-bootstrap";

const App403 = () => {
  return (
    <div>
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};

export default App403;
