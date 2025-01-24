const KibanaDashboard = () => (
  <div style={{ width: '100%', height: '600px', overflow: 'hidden' }}>
    <iframe
      src="http://localhost:5601/app/dashboards#/view/3386a3c1-6cce-4e05-a231-725ef38f4b4f?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A60000)%2Ctime%3A(from%3Anow-7d%2Fd%2Cto%3Anow))"
      height="600"
      width="800"
    ></iframe>
  </div>
);

export default KibanaDashboard;
