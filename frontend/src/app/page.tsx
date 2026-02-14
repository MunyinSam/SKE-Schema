import { Sarabun } from 'next/font/google';

const sarabun = Sarabun({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin', 'thai'],
	variable: '--font-sarabun',
	display: 'swap',
});

export default function Home() {
	return (
		<main className="max-w-6xl mx-auto px-6 py-16">
			<div className="text-center mb-12">
				<h2 className={`${sarabun.className} text-5xl font-bold text-[#006837] mb-4`}>
					ยินดีต้อนรับสู่ SKE Schema
				</h2>
				<p className={`${sarabun.className} text-2xl text-gray-700 mb-2`}>
					แหล่งแบ่งปันความรู้และไฟล์เรียน
				</p>
				<p className="text-lg text-gray-600">Knowledge Sharing Platform for SKE Students</p>
			</div>

			{/* Feature Cards */}
			<div className="grid md:grid-cols-3 gap-6 mt-12">
				{/* Card 1 */}
				<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#006837] hover:shadow-xl transition-shadow">
					<div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
						<span className="text-2xl">📚</span>
					</div>
					<h3 className={`${sarabun.className} text-xl font-semibold text-[#006837] mb-2`}>
						ห้องสมุดความรู้
					</h3>
					<p className="text-gray-600">เข้าถึงเอกสารและความรู้ทางวิชาการได้ง่ายดาย</p>
				</div>

				{/* Card 2 */}
				<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#FDB913] hover:shadow-xl transition-shadow">
					<div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
						<span className="text-2xl">💰</span>
					</div>
					<h3 className={`${sarabun.className} text-xl font-semibold text-[#006837] mb-2`}>
						การเงินโปร่งใส
					</h3>
					<p className="text-gray-600">ติดตามการใช้จ่ายและงบประมาณได้อย่างชัดเจน</p>
				</div>

				{/* Card 3 */}
				<div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#006837] hover:shadow-xl transition-shadow">
					<div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
						<span className="text-2xl">👥</span>
					</div>
					<h3 className={`${sarabun.className} text-xl font-semibold text-[#006837] mb-2`}>
						ชุมชน SKE
					</h3>
					<p className="text-gray-600">แบ่งปันและเรียนรู้ร่วมกันในชุมชน Software Engineering</p>
				</div>
			</div>

			{/* CTA Button */}
			<div className="text-center mt-12">
				<button className="bg-[#006837] hover:bg-[#005028] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
					เริ่มต้นใช้งาน
				</button>
			</div>
		</main>
	);
}
