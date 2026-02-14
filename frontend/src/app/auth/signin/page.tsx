import { Sarabun } from 'next/font/google';
import Link from 'next/link';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function SignInPage() {
	return (
		<main className="flex min-h-[calc(100vh-180px)] items-center justify-center px-6 py-12">
			<div className="w-full max-w-md">
				{/* Card Container */}
				<div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#006837]">
					{/* Logo/Header */}
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-[#006837] rounded-full flex items-center justify-center mx-auto mb-4">
							<span className="text-white font-bold text-2xl">SKE</span>
						</div>
						<h1 className={`${sarabun.className} text-3xl font-bold text-[#006837] mb-2`}>
							เข้าสู่ระบบ
						</h1>
						<p className="text-gray-600">Sign in to SKE Schema</p>
					</div>

					{/* Sign In Form */}
					<form className="space-y-5">
						{/* Email Input */}
						<div>
							<label
								htmlFor="email"
								className={`${sarabun.className} block text-sm font-medium text-gray-700 mb-2`}
							>
								อีเมล / Email
							</label>
							<input
								type="email"
								id="email"
								placeholder="your.email@ku.th"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:border-transparent outline-none transition-all"
								required
							/>
						</div>

						{/* Password Input */}
						<div>
							<label
								htmlFor="password"
								className={`${sarabun.className} block text-sm font-medium text-gray-700 mb-2`}
							>
								รหัสผ่าน / Password
							</label>
							<input
								type="password"
								id="password"
								placeholder="••••••••"
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#006837] focus:border-transparent outline-none transition-all"
								required
							/>
						</div>

						{/* Remember Me & Forgot Password */}
						<div className="flex items-center justify-between">
							<label className="flex items-center">
								<input
									type="checkbox"
									className="w-4 h-4 text-[#006837] border-gray-300 rounded focus:ring-[#006837]"
								/>
								<span className="ml-2 text-sm text-gray-600">จดจำฉันไว้</span>
							</label>
							<Link
								href="/auth/forgot-password"
								className="text-sm text-[#006837] hover:text-[#005028] font-medium"
							>
								ลืมรหัสผ่าน?
							</Link>
						</div>

						{/* Sign In Button */}
						<button
							type="submit"
							className="w-full bg-[#006837] hover:bg-[#005028] text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98]"
						>
							เข้าสู่ระบบ
						</button>
					</form>

					{/* Divider */}
					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-4 bg-white text-gray-500">หรือ</span>
						</div>
					</div>

					{/* KU Account Sign In */}
					<button
						type="button"
						className="w-full flex items-center justify-center gap-3 border-2 border-[#006837] text-[#006837] hover:bg-emerald-50 font-semibold py-3 rounded-lg transition-all"
					>
						<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
						</svg>
						Sign in with KU Account
					</button>

					{/* Sign Up Link */}
					<p className="text-center mt-6 text-sm text-gray-600">
						ยังไม่มีบัญชี?{' '}
						<Link href="/auth/signup" className="text-[#006837] hover:text-[#005028] font-semibold">
							สมัครสมาชิก
						</Link>
					</p>
				</div>

				{/* Additional Info */}
				<p className={`${sarabun.className} text-center mt-6 text-sm text-gray-600`}>
					สำหรับนักศึกษา SKE มหาวิทยาลัยเกษตรศาสตร์
				</p>
			</div>
		</main>
	);
}
