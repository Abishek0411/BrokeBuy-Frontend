import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Wallet as WalletIcon, 
  Plus, 
  Minus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard,
  History,
  TrendingUp
} from 'lucide-react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const Wallet: React.FC = () => {
  const { user } = useAuth();
  const [addAmount, setAddAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  // Mock transaction data
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'credit',
      amount: 500,
      description: 'Sale of iPhone 12',
      date: '2024-01-25',
      status: 'completed'
    },
    {
      id: '2',
      type: 'debit',
      amount: 150,
      description: 'Purchase of Textbook',
      date: '2024-01-24',
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 1000,
      description: 'Wallet Top-up',
      date: '2024-01-20',
      status: 'completed'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary">Completed</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-8">
            <p>Please log in to view your wallet.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage your money and transactions</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="mb-8 glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <WalletIcon className="h-6 w-6" />
                Wallet Balance
              </CardTitle>
              <CardDescription>Your current available balance</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(user.wallet_balance)}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +2.5% this month
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="add-money">Add Money</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Transaction History
              </CardTitle>
              <CardDescription>
                View your recent transactions and account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'credit' 
                          ? 'bg-green-100 text-green-600 dark:bg-green-900/20' 
                          : 'bg-red-100 text-red-600 dark:bg-red-900/20'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(transaction.date)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(transaction.status)}
                      <div className={`font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-money" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add Money to Wallet
              </CardTitle>
              <CardDescription>
                Top up your wallet balance for seamless transactions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="add-amount">Amount to Add</Label>
                <Input
                  id="add-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={addAmount}
                  onChange={(e) => setAddAmount(e.target.value)}
                />
              </div>

              {/* Quick amount buttons */}
              <div className="grid grid-cols-4 gap-2">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setAddAmount(amount.toString())}
                    className="text-sm"
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Payment Method</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1">
                      <div className="font-medium">UPI Payment</div>
                      <div className="text-sm text-muted-foreground">Pay using any UPI app</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                    <CreditCard className="h-5 w-5" />
                    <div className="flex-1">
                      <div className="font-medium">Debit/Credit Card</div>
                      <div className="text-sm text-muted-foreground">Secure card payment</div>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full btn-primary" disabled={!addAmount}>
                Add {addAmount ? formatCurrency(Number(addAmount)) : 'Money'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Minus className="h-5 w-5" />
                Withdraw Money
              </CardTitle>
              <CardDescription>
                Transfer money from your wallet to your bank account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="text-sm text-muted-foreground mb-1">Available Balance</div>
                <div className="text-2xl font-bold">{formatCurrency(user.wallet_balance)}</div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  max={user.wallet_balance}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Bank Account</h4>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium">HDFC Bank ****1234</div>
                  <div className="text-sm text-muted-foreground">Primary account</div>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <div className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Withdrawal processing time is 1-3 business days. 
                  Minimum withdrawal amount is ₹100.
                </div>
              </div>

              <Button 
                className="w-full btn-primary" 
                disabled={!withdrawAmount || Number(withdrawAmount) > user.wallet_balance || Number(withdrawAmount) < 100}
              >
                Withdraw {withdrawAmount ? formatCurrency(Number(withdrawAmount)) : 'Money'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;