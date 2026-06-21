"""
PBPE Blockchain Core (Layer 0)

Simple append-only blockchain for PBPE Registry entries.
This is an internal, permissioned chain designed to provide
immutability and traceability for PBPE Marketplace events.
"""

from __future__ import annotations

import hashlib
import json
import time
from dataclasses import dataclass, asdict
from typing import Any, List, Optional


@dataclass
class Block:
    index: int
    previous_hash: str
    timestamp: float
    payload: dict
    hash: str


class Blockchain:
    def __init__(self) -> None:
        self._chain: List[Block] = []
        self._create_genesis_block()

    def _create_genesis_block(self) -> None:
        genesis_payload = {"type": "genesis", "message": "PBPE Chain Genesis"}
        genesis_block = self._create_block(
            index=0,
            previous_hash="0" * 64,
            payload=genesis_payload,
        )
        self._chain.append(genesis_block)

    @property
    def chain(self) -> List[Block]:
        return self._chain

    def _compute_hash(self, index: int, previous_hash: str, timestamp: float, payload: dict) -> str:
        block_string = json.dumps(
            {
                "index": index,
                "previous_hash": previous_hash,
                "timestamp": timestamp,
                "payload": payload,
            },
            sort_keys=True,
            ensure_ascii=False,
        ).encode("utf-8")
        return hashlib.sha256(block_string).hexdigest()

    def _create_block(self, index: int, previous_hash: str, payload: dict) -> Block:
        ts = time.time()
        block_hash = self._compute_hash(index=index, previous_hash=previous_hash, timestamp=ts, payload=payload)
        return Block(
            index=index,
            previous_hash=previous_hash,
            timestamp=ts,
            payload=payload,
            hash=block_hash,
        )

    def add_block(self, payload: dict) -> Block:
        last_block = self._chain[-1]
        new_index = last_block.index + 1
        new_block = self._create_block(
            index=new_index,
            previous_hash=last_block.hash,
            payload=payload,
        )
        self._chain.append(new_block)
        return new_block

    def is_valid(self) -> bool:
        if not self._chain:
            return False

        for i in range(1, len(self._chain)):
            current = self._chain[i]
            previous = self._chain[i - 1]

            if current.previous_hash != previous.hash:
                return False

            expected_hash = self._compute_hash(
                index=current.index,
                previous_hash=current.previous_hash,
                timestamp=current.timestamp,
                payload=current.payload,
            )
            if current.hash != expected_hash:
                return False

        return True

    def get_block_by_hash(self, block_hash: str) -> Optional[Block]:
        for block in self._chain:
            if block.hash == block_hash:
                return block
        return None

    def to_dict(self) -> List[dict]:
        return [asdict(b) for b in self._chain]


# Singleton instance for the application
blockchain = Blockchain()
