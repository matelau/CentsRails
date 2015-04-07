ENV['RAILS_ENV'] = "development" # Set to your desired Rails environment name
require_relative '../config/environment.rb'

names = Degree.uniq.pluck(:name)

names.each do |n|
=begin
	rows = Degree.where("name = ? and level like ?", n, "%Bachelor%")

	unless rows.count == 1 or rows.count == 0
		sal = 0
		count = 0
		base = nil

		rows.each do |r|
			if r.meaningful != nil or r.recommend != nil
				base = r
			end

			next if r.salary == nil
			sal += r.salary
			count += 1
		end

		base = rows.first if base == nil

		puts base.name

		base.update(salary: (sal/count).round(2))

		ids = []
		
		rows.each do |r|
			next if r.id == base.id
			tjs = TopJob.where(degree_id: r.id)

			tjs.each do |t|
				t.update(degree_id: base.id)
			end

			ids << r.id
		end

		ids.each do |i|
			Degree.find_by(id: i).destroy()
		end
	end

	rows = Degree.where("name = ? and level like ?", n, "%Associate%")

	unless rows.count == 1 or rows.count == 0
		sal = 0
		count = 0
		base = nil

		rows.each do |r|
			if r.meaningful != nil or r.recommend != nil
				base = r
			end

			next if r.salary == nil
			sal += r.salary
			count += 1
		end

		base = rows.first if base == nil

		puts base.name

		base.update(salary: (sal/count).round(2))

		ids = []
		
		rows.each do |r|
			next if r.id == base.id
			tjs = TopJob.where(degree_id: r.id)

			tjs.each do |t|
				t.update(degree_id: base.id)
			end

			ids << r.id
		end

		ids.each do |i|
			Degree.find_by(id: i).destroy()
		end
	end

	rows = Degree.where("name = ? and level like ?", n, "%Master%")

	unless rows.count == 1 or rows.count == 0
		sal = 0
		count = 0
		base = nil

		rows.each do |r|
			if r.meaningful != nil or r.recommend != nil
				base = r
			end

			next if r.salary == nil
			sal += r.salary
			count += 1
		end

		base = rows.first if base == nil

		puts base.name

		base.update(salary: (sal/count).round(2))

		ids = []
		
		rows.each do |r|
			next if r.id == base.id
			tjs = TopJob.where(degree_id: r.id)

			tjs.each do |t|
				t.update(degree_id: base.id)
			end

			ids << r.id
		end

		ids.each do |i|
			Degree.find_by(id: i).destroy()
		end
	end

	rows = Degree.where("name = ? and level like ?", n, "%Doctorate%")

	unless rows.count == 1 or rows.count == 0
		sal = 0
		count = 0
		base = nil

		rows.each do |r|
			if r.meaningful != nil or r.recommend != nil
				base = r
			end

			next if r.salary == nil
			sal += r.salary
			count += 1
		end

		base = rows.first if base == nil

		puts base.name

		base.update(salary: (sal/count).round(2))

		ids = []
		
		rows.each do |r|
			next if r.id == base.id
			tjs = TopJob.where(degree_id: r.id)

			tjs.each do |t|
				t.update(degree_id: base.id)
			end

			ids << r.id
		end

		ids.each do |i|
			Degree.find_by(id: i).destroy()
		end
	end
=end
	rows = Degree.where(name: n)

	next if rows.count == 1 or rows.count == 0

	mean = nil
	rec = nil

	rows.each do |r|
		rec = r.recommend if r.recommend != nil
		mean = r.meaningful if r.meaningful != nil
	end

	rows.each do |r|
		r.update(recommend: rec)
		r.update(meaningful: mean)
	end
end