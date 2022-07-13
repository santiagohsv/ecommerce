const getInfo = () => {
  return {
    argumentos: process.argv.slice(2),
    os: process.platform,
    node: process.version,
    memory: process.memoryUsage().rss,
    path: process.cwd(),
    process_ID: process.pid,
  };
};

module.exports = getInfo;
