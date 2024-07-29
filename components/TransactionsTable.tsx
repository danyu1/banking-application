import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatAmount, formatDateTime, getTransactionStatus, removeSpecialCharacters } from "@/lib/utils";
import { getTransactions } from "@/lib/actions/bank.actions";

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="pax-2">Transaction</TableHead>
          <TableHead className="pax-2">Amount</TableHead>
          <TableHead className="pax-2">Status</TableHead>
          <TableHead className="pax-2">Date</TableHead>
          <TableHead className="pax-2 max-md:hidden">Channel</TableHead>
          <TableHead className="pax-2 mad-md:hidden">Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t: Transaction) => {
            const status = getTransactionStatus(new Date(t.date))
            const amount = formatAmount(t.amount)

            const isDebit = t.type === 'debit';
            const isCredit = t.type === 'credit';

            return(
                <TableRow key={t.id}>
                    <TableCell>
                        <div>
                            <h1>
                                {removeSpecialCharacters(t.name)}
                            </h1>
                        </div>
                    </TableCell>
                    <TableCell>
                        {isDebit ? '-${amount}' : isCredit ? amount : amount}
                    </TableCell>
                    <TableCell>
                        {status}
                    </TableCell>
                    <TableCell>
                        {formatDateTime(new Date(t.date)).dateTime}
                    </TableCell>
                </TableRow>
            )
        })}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
