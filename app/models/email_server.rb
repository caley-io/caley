class EmailServer < ApplicationRecord
  belongs_to :user
  belongs_to :team, optional: true

  # Establishes an IMAP connection using email_server credentials.
  # If the connection fails, it logs the error and returns nil.
  #
  # Returns the IMAP connection object if successful.
  def establish_imap_connection
    @imap_connection ||= Net::IMAP.new(imap_server, port: imap_port, ssl: imap_ssl)
    @imap_connection.login(email, password)
    @imap_connection
  rescue Net::IMAP::Error => error
    puts "Failed to connect to IMAP: #{error.message}"
    nil
  end

  # Retrieves the 20 most recent emails from the email_server's inbox.
  # It first establishes an IMAP connection, then searches for and fetches the emails.
  # If fetching fails, it logs the error and returns an empty array.
  #
  # Returns an array of hashes, each representing an email with its date, subject, from, and to fields.
  def retrieve_recent_emails
    establish_imap_connection
    return unless @imap_connection

    @imap_connection.select("INBOX")
    email_uids = @imap_connection.uid_search(["ALL"])
    recent_uids = email_uids.last(20)

    @recent_emails ||= @imap_connection.uid_fetch(recent_uids, ["ENVELOPE"]).map do |email_item|
      envelope = email_item.attr["ENVELOPE"]
      {
        date: envelope.date,
        subject: envelope.subject,
        from: "#{envelope.from[0].mailbox}@#{envelope.from[0].host}",
        to: "#{envelope.to[0].mailbox}@#{envelope.to[0].host}"
      }
    end

    @imap_connection.logout
    @imap_connection.disconnect
    @recent_emails
  rescue Net::IMAP::Error => error
    puts "Failed to retrieve emails: #{error.message}"
    []
  end
end

# == Schema Information
#
# Table name: email_servers
#
#  id          :bigint           not null, primary key
#  email       :string           not null
#  imap_port   :integer          not null
#  imap_server :string           not null
#  imap_ssl    :boolean          not null
#  name        :string           not null
#  password    :string
#  provider    :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  team_id     :bigint
#  user_id     :bigint           not null
#
# Indexes
#
#  index_email_servers_on_team_id  (team_id)
#  index_email_servers_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (team_id => teams.id)
#  fk_rails_...  (user_id => users.id)
#
