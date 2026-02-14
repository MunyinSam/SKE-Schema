'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sarabun } from 'next/font/google';
import {
	Wallet,
	TrendingUp,
	TrendingDown,
	CreditCard,
	Receipt,
	AlertCircle,
	CheckCircle,
	Clock,
} from 'lucide-react';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function FinancePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/login');
		}
	}, [status, router]);

	if (status === 'loading') {
		return (
			<div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-[#006837] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
					<p className="text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		return null;
	}
	// Mock data for demonstration
	const payments = [
		{
			id: 1,
			description: 'Group Project - Web Development',
			amount: 500,
			status: 'paid',
			date: '2026-02-10',
			paidBy: 'You',
		},
		{
			id: 2,
			description: 'Textbook - Data Structures',
			amount: 1200,
			status: 'pending',
			date: '2026-02-08',
			paidBy: 'Pending',
		},
		{
			id: 3,
			description: 'Lab Equipment',
			amount: 800,
			status: 'paid',
			date: '2026-02-05',
			paidBy: 'You',
		},
		{
			id: 4,
			description: 'Study Room Rental',
			amount: 300,
			status: 'overdue',
			date: '2026-02-01',
			paidBy: 'Overdue',
		},
		{
			id: 5,
			description: 'Software License',
			amount: 2000,
			status: 'paid',
			date: '2026-01-28',
			paidBy: 'You',
		},
	];

	const totalPaid = payments
		.filter((p) => p.status === 'paid')
		.reduce((sum, p) => sum + p.amount, 0);
	const totalPending = payments
		.filter((p) => p.status === 'pending')
		.reduce((sum, p) => sum + p.amount, 0);
	const totalOverdue = payments
		.filter((p) => p.status === 'overdue')
		.reduce((sum, p) => sum + p.amount, 0);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'paid':
				return (
					<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
						<CheckCircle className="w-3 h-3" />
						Paid
					</span>
				);
			case 'pending':
				return (
					<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
						<Clock className="w-3 h-3" />
						Pending
					</span>
				);
			case 'overdue':
				return (
					<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
						<AlertCircle className="w-3 h-3" />
						Overdue
					</span>
				);
			default:
				return null;
		}
	};

	return (
		<main className="min-h-[calc(100vh-180px)] p-6">
			<div className="max-w-7xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className={`${sarabun.className} text-3xl font-bold text-[#006837]`}>การเงิน</h1>
						<p className="text-muted-foreground mt-1">Track your expenses and payments</p>
					</div>
					<Button className="bg-[#006837] hover:bg-[#005530] gap-2">
						<CreditCard className="w-4 h-4" />
						Add Payment
					</Button>
				</div>

				{/* Financial Overview */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card className="border-l-4 border-l-blue-500">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<Wallet className="w-4 h-4" />
								Total Balance
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold">
								฿{(totalPaid + totalPending + totalOverdue).toLocaleString()}
							</p>
							<p className="text-xs text-muted-foreground mt-1">All transactions</p>
						</CardContent>
					</Card>

					<Card className="border-l-4 border-l-green-500">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<TrendingUp className="w-4 h-4" />
								Paid
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold text-green-600">฿{totalPaid.toLocaleString()}</p>
							<p className="text-xs text-muted-foreground mt-1">
								{payments.filter((p) => p.status === 'paid').length} payments
							</p>
						</CardContent>
					</Card>

					<Card className="border-l-4 border-l-yellow-500">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<Clock className="w-4 h-4" />
								Pending
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold text-yellow-600">฿{totalPending.toLocaleString()}</p>
							<p className="text-xs text-muted-foreground mt-1">
								{payments.filter((p) => p.status === 'pending').length} pending
							</p>
						</CardContent>
					</Card>

					<Card className="border-l-4 border-l-red-500">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
								<TrendingDown className="w-4 h-4" />
								Overdue
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-bold text-red-600">฿{totalOverdue.toLocaleString()}</p>
							<p className="text-xs text-muted-foreground mt-1">
								{payments.filter((p) => p.status === 'overdue').length} overdue
							</p>
						</CardContent>
					</Card>
				</div>

				{/* Payment History */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle>Payment History</CardTitle>
								<CardDescription>Your recent transactions and payments</CardDescription>
							</div>
							<Button variant="outline" size="sm" className="gap-2">
								<Receipt className="w-4 h-4" />
								Export
							</Button>
						</div>
					</CardHeader>
					<CardContent>
						<div className="space-y-2">
							{payments.map((payment) => (
								<div
									key={payment.id}
									className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
								>
									<div className="flex items-center gap-4 flex-1">
										<div
											className={`p-3 rounded-full ${
												payment.status === 'paid'
													? 'bg-green-100'
													: payment.status === 'pending'
														? 'bg-yellow-100'
														: 'bg-red-100'
											}`}
										>
											<CreditCard
												className={`w-5 h-5 ${
													payment.status === 'paid'
														? 'text-green-600'
														: payment.status === 'pending'
															? 'text-yellow-600'
															: 'text-red-600'
												}`}
											/>
										</div>
										<div className="flex-1">
											<div className="flex items-center gap-2">
												<p className="font-medium">{payment.description}</p>
												{getStatusBadge(payment.status)}
											</div>
											<p className="text-sm text-muted-foreground">
												{new Date(payment.date).toLocaleDateString('th-TH', {
													year: 'numeric',
													month: 'long',
													day: 'numeric',
												})}{' '}
												• {payment.paidBy}
											</p>
										</div>
										<div className="text-right">
											<p className="text-lg font-semibold">฿{payment.amount.toLocaleString()}</p>
										</div>
									</div>
									<Button size="sm" variant="ghost">
										<Receipt className="w-4 h-4" />
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="hover:shadow-md transition-shadow cursor-pointer">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<CreditCard className="w-5 h-5 text-[#006837]" />
								Make Payment
							</CardTitle>
							<CardDescription>Pay pending bills</CardDescription>
						</CardHeader>
					</Card>

					<Card className="hover:shadow-md transition-shadow cursor-pointer">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<Receipt className="w-5 h-5 text-[#006837]" />
								Request Receipt
							</CardTitle>
							<CardDescription>Get payment confirmation</CardDescription>
						</CardHeader>
					</Card>

					<Card className="hover:shadow-md transition-shadow cursor-pointer">
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-base">
								<Wallet className="w-5 h-5 text-[#006837]" />
								View Budget
							</CardTitle>
							<CardDescription>Track spending limits</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</div>
		</main>
	);
}
