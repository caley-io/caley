class EmailThreadsController < ApplicationController
  layout "email_thread", only: [ :new, :show ]

  before_action :authenticate_user!
  before_action :initialize_filters

  # TODO: Add filter for inbox, reply later, all
  def inbox
    # TODO: This is a temporary solution to retrieve the last 20 emails
    # TODO: Add a user setting to toggle email servers
    @email_server = current_user.email_servers.first
    @email_threads = @email_server.email_threads.includes(:messages)
  end

  def new; end

  def show
    @thread = EmailThread.find(params[:id])
    @messages = @thread.messages.includes(:user)
  end

  # private

  def initialize_filters
    @filters = [ "Inbox", "Reply later", "All" ]
  end
end
