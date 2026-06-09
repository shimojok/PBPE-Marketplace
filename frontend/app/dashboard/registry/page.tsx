"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/components/ui/table";

type RegistryEntry = {
  id: string;
  kind: string;
  subject_id: string;
  actor: string;
  amount: number;
  unit: string;
  timestamp: number;
  chain_hash: string | null;
};

type ChainStatus = {
  length: number;
  is_valid: boolean;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function RegistryPage() {
  const [entries, setEntries] = useState<RegistryEntry[]>([]);
  const [chainStatus, setChainStatus] = useState<ChainStatus | null>(null);

  const [searchRptId, setSearchRptId] = useState("");
  const [searchSubjectId, setSearchSubjectId] = useState("");
  const [searchActor, setSearchActor] = useState("");
  const [searchKind, setSearchKind] = useState("");

  const [selectedEntry, setSelectedEntry] = useState<RegistryEntry | null>(null);

  const fetchChainStatus = async () => {
    const res = await fetch(`${API_BASE}/registry/chain/status`);
    const data = await res.json();
    setChainStatus(data);
  };

  const fetchAll = async () => {
    const res = await fetch(`${API_BASE}/registry/search`);
    const data = await res.json();
    setEntries(data);
    setSelectedEntry(null);
  };

  const searchByRptId = async () => {
    if (!searchRptId) return;
    const res = await fetch(`${API_BASE}/registry/${encodeURIComponent(searchRptId)}`);
    if (!res.ok) return;
    const data = await res.json();
    setEntries([data]);
    setSelectedEntry(data);
  };

  const searchBySubjectId = async () => {
    if (!searchSubjectId) return;
    const res = await fetch(
      `${API_BASE}/registry/by-subject/${encodeURIComponent(searchSubjectId)}`
    );
    if (!res.ok) return;
    const data = await res.json();
    setEntries(data);
    setSelectedEntry(null);
  };

  const searchByActorKind = async () => {
    const params = new URLSearchParams();
    if (searchActor) params.append("actor", searchActor);
    if (searchKind) params.append("kind", searchKind);
    const res = await fetch(`${API_BASE}/registry/search?${params.toString()}`);
    if (!res.ok) return;
    const data = await res.json();
    setEntries(data);
    setSelectedEntry(null);
  };

  useEffect(() => {
    fetchAll();
    fetchChainStatus();
  }, []);

  const formatTimestamp = (ts: number) => {
    return new Date(ts * 1000).toLocaleString();
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>PBPE Registry Explorer</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Search by RPT-ID</label>
              <div className="flex gap-2">
                <Input
                  value={searchRptId}
                  onChange={(e) => setSearchRptId(e.target.value)}
                  placeholder="RPT-XXXXXXX"
                />
                <Button onClick={searchByRptId}>Search</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Search by Subject ID</label>
              <div className="flex gap-2">
                <Input
                  value={searchSubjectId}
                  onChange={(e) => setSearchSubjectId(e.target.value)}
                  placeholder="CRD- / BND- / TRD- / KPI-"
                />
                <Button onClick={searchBySubjectId}>Search</Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Search by Actor / Kind</label>
              <div className="flex gap-2">
                <Input
                  value={searchActor}
                  onChange={(e) => setSearchActor(e.target.value)}
                  placeholder="Actor (company / gov)"
                />
                <Input
                  value={searchKind}
                  onChange={(e) => setSearchKind(e.target.value)}
                  placeholder="kind (credit_issuance, scope3_report, ...)"
                />
                <Button onClick={searchByActorKind}>Search</Button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button variant="outline" onClick={fetchAll}>
              Load All Entries
            </Button>
            {chainStatus && (
              <div className="text-sm text-muted-foreground">
                Chain length: <span className="font-semibold">{chainStatus.length}</span>{" "}
                | Valid:{" "}
                <span
                  className={
                    chainStatus.is_valid ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                  }
                >
                  {chainStatus.is_valid ? "YES" : "NO"}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Registry Entries</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <Thead>
                <Tr>
                  <Th>ID</Th>
                  <Th>Kind</Th>
                  <Th>Subject</Th>
                  <Th>Actor</Th>
                  <Th>Amount</Th>
                  <Th>Unit</Th>
                  <Th>Timestamp</Th>
                  <Th>Chain</Th>
                </Tr>
              </Thead>
              <Tbody>
                {entries.map((e) => (
                  <Tr
                    key={e.id}
                    className="cursor-pointer hover:bg-muted"
                    onClick={() => setSelectedEntry(e)}
                  >
                    <Td>{e.id}</Td>
                    <Td>{e.kind}</Td>
                    <Td>{e.subject_id}</Td>
                    <Td>{e.actor}</Td>
                    <Td>{e.amount}</Td>
                    <Td>{e.unit}</Td>
                    <Td>{formatTimestamp(e.timestamp)}</Td>
                    <Td>
                      {e.chain_hash ? (
                        <span className="text-green-600 font-semibold">✔</span>
                      ) : (
                        <span className="text-red-600 font-semibold">✖</span>
                      )}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entry Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEntry ? (
              <div className="flex flex-col gap-2 text-sm">
                <div>
                  <span className="font-semibold">ID:</span> {selectedEntry.id}
                </div>
                <div>
                  <span className="font-semibold">Kind:</span> {selectedEntry.kind}
                </div>
                <div>
                  <span className="font-semibold">Subject:</span> {selectedEntry.subject_id}
                </div>
                <div>
                  <span className="font-semibold">Actor:</span> {selectedEntry.actor}
                </div>
                <div>
                  <span className="font-semibold">Amount:</span> {selectedEntry.amount}{" "}
                  {selectedEntry.unit}
                </div>
                <div>
                  <span className="font-semibold">Timestamp:</span>{" "}
                  {formatTimestamp(selectedEntry.timestamp)}
                </div>
                <div>
                  <span className="font-semibold">Chain Hash:</span>{" "}
                  {selectedEntry.chain_hash ?? "N/A"}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Select a registry entry from the table to see details.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
