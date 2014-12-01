namespace :forward_ports do
  desc "Opens an SSH tunnel to our database on bitnami."
  task toBitnami: :environment do
    `ssh -N -L 3306:127.0.0.1:3306 -i ../../bitnami-hosting.cer ubuntu@54.148.183.206`
  end

end
