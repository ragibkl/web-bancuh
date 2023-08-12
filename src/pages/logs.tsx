import Head from "next/head";

import Header from "../components/Header";
import { Server, servers } from "../services/servers";
import { useEffect, useState } from "react";

type Query = {
  queryAddress: string;
  responseAddress: string;
  question: string;
  answers: string[];
};

async function fetchQueriesIpv4(ipv4: string): Promise<Query[]> {
  const url = `http://${ipv4}:8080/api/getLogs`;
  const res = await fetch(url);
  const data = await res.json();

  return data.queries as Query[];
}

async function fetchQueriesIpv6(ipv6: string): Promise<Query[]> {
  const url = `http://[${ipv6}]:8080/api/getLogs`;
  const res = await fetch(url);
  const data = await res.json();

  return data.queries as Query[];
}

function QueriesTable(props: { queries: Query[] }) {
  return (
    <table className="table-auto border-2">
      <thead>
        <tr>
          <th className="border-2">Query</th>
          <th className="border-2">Answers</th>
        </tr>
      </thead>
      <tbody>
        {props.queries.map((q, i) => (
          <tr key={i}>
            <td className="border-2 p-2">{q.question}</td>
            <td className="border-2 p-2">
              <ul className="list-disc list-inside">
                {q.answers.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function LogsPage() {
  const [server, setServer] = useState<string>("");
  const [queriesIpv4, setQueriesIpv4] = useState<Query[]>([]);
  const [queriesIpv6, setQueriesIpv6] = useState<Query[]>([]);
  const selectedServer: Server | undefined = servers.find(
    (s) => s.shortName === server
  );

  useEffect(() => {
    const retrieveQueries = async () => {
      if (!selectedServer) {
        return;
      }

      const queriesIpv4 = await fetchQueriesIpv4(selectedServer.ipv4);
      const queriesIpv6 = await fetchQueriesIpv6(selectedServer.ipv6);
      setQueriesIpv4(queriesIpv4);
      setQueriesIpv6(queriesIpv6);
    };

    retrieveQueries();
  }, [selectedServer]);

  return (
    <>
      <Head>
        <title>Bancuh DNS: Logs</title>
        <meta name="description" content="Free Adblock DNS" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Header />

        <div className="bg-white">
          <div className="container mx-auto max-w-screen-lg p-10">
            <p className="text-4xl">Logs</p>

            <div className="py-3">
              <p className="text-xl font-semibold py-2">Select a Server</p>
              <p className="text-lg text-indent-2">Pick a server to query</p>

              <select
                onChange={(e) => setServer(e.currentTarget.value)}
                value={server}
              >
                {!server && <option value="">Select Server</option>}
                {servers.map((s) => (
                  <option value={s.shortName} key={s.shortName}>
                    {s.shortName} - {s.location}
                  </option>
                ))}
              </select>
            </div>

            {!!queriesIpv4.length && (
              <div className="py-3">
                <p className="text-xl font-semibold py-2">Query Logs Ipv4</p>
                <QueriesTable queries={queriesIpv4} />
              </div>
            )}

            {!!queriesIpv6.length && (
              <div className="py-3">
                <p className="text-xl font-semibold py-2">Query Logs Ipv6</p>
                <QueriesTable queries={queriesIpv6} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
